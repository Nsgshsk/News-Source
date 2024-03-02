from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

class LoginRateThrottle(AnonRateThrottle):
    scope = 'login'

class RegisterRateThrottle(AnonRateThrottle):
    scope = 'register'

class UserFeedRateThrottle(UserRateThrottle):
    scope = 'userfeeds'
    def allow_request(self, request, view):
        if request.method == "GET":
            return True
        return super().allow_request(request, view)