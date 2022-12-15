package shortify.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
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
    public AppUser registerUser(@RequestBody @Valid UserSignUpDTO userSignUpDTO, Errors errors) {
        if (errors.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Form validation unsuccessful");
        }

        return appUserService.saveUser(userSignUpDTO);
    }

    @PostMapping("/login")
    public void login() {
        throw new UnsupportedOperationException();
    }
}
