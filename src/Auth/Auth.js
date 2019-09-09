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
        sessionStorage.setItem('userProfile', JSON.stringify(res));
        api.get_jwt(user).then(res => { this.handleAuthentication(res) }).catch(err => { })
      }
      else {
        alert('user not  exsist or wrong password')
      }
    }).catch(err => { })
  }

  getprofile() {

    return sessionStorage.getItem('userProfile')

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

    sessionStorage.setItem('access_token', authResult.accessToken);
    sessionStorage.setItem('id_token', authResult.idToken);
    sessionStorage.setItem('expires_at', expiresAt);

    // schedule a token renewal
    // this.scheduleRenewal();

    // navigate to the home route

  }

  getAccessToken() {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  logout() {
    // Clear access token and ID token from local storage
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
    sessionStorage.removeItem('scopes');
    sessionStorage.removeItem('userProfile');
    this.userProfile = null;
    clearTimeout(this.tokenRenewalTimeout);
    // navigate to the home route
    history.replace('/HomePage');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  ismt() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    let authmt = JSON.parse(sessionStorage.getItem('userProfile')).company_name;

    return new Date().getTime() < expiresAt && authmt == 'mt';
  }
  isboss() {
    let expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    let auth = JSON.parse(sessionStorage.getItem('userProfile')).auth;

    return new Date().getTime() < expiresAt && auth > 2;
  }
  renewToken(user) {
    api.get_jwt(user).then(res => { this.handleAuthentication(res) }).catch(err => { })
    //alert(`閒製過久自動跳轉頁面（waiting too long tome to redirect to homepage）`);
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(sessionStorage.getItem('expires_at'));
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }




}
