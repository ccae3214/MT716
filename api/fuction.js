{
    "bindings": [
        {
            "authLevel": "anonymous",
            "type": "httpTrigger",
            "direction": "in",
            "name": "req",
            "methods": ["post","get"],
            "route": "login"
        },
        {
            "type": "http",
            "direction": "out",
            "name": "res"
        }
    ]
}