package shortify.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shortify.backend.model.AppUser;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.service.AppUserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @PostMapping("/signup")
    public AppUser registerUser(@RequestBody @Valid UserSignUpDTO userSignUpDTO) {
        return appUserService.saveUser(userSignUpDTO);
    }

    @PostMapping("/login")
    public String login() {
        return "login";
    }
}
