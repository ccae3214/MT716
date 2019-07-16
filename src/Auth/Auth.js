import history from '../history'
import api from './api'
export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;
  tokenRenewalTimeout;

  componentDidMount() {
    this.timerID = setInterval(
      () => this.renewToken(),
      60000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);

    this.scheduleRenewal();
  }

  login(user) {
    api.get_user(user).then(res => {
      if (res !== null) {
        this.userProfile = res
        localStorage.setItem('userProfile', JSON.stringify(res));
        api.get_jwt(user).then(res => { this.handleAuthentication(res) }).catch(err => { })
      }
      else {
        alert('user not  exsist or wrong password')
      }
    }).catch(err => { })
  }

  getprofile() {

    return localStorage.getItem('userProfile')

  }

  handleAuthentication(authResult) {
    this.setSession(authResult);
    history.replace('/IndexPage');
  }
  getAccessToken() {
    return this.accessToken;
  }
  getIdToken() {
    return this.idToken;
  }
  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 10000 + new Date().getTime()
    );

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // schedule a token renewal
    // this.scheduleRenewal();

    // navigate to the home route

  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('userProfile');
    this.userProfile = null;
    clearTimeout(this.tokenRenewalTimeout);
    // navigate to the home route
    history.replace('/HomePage');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  isboss() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let authlevel = JSON.parse(localStorage.getItem('userProfile')).auth;
    return new Date().getTime() < expiresAt && authlevel > 2;
  }
  renewToken(user) {
    api.get_jwt(user).then(res => { this.handleAuthentication(res) }).catch(err => { })
    //alert(`閒製過久自動跳轉頁面（waiting too long tome to redirect to homepage）`);
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }




}
