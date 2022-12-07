package shortify.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.service.AppUserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @PostMapping("/signup")
    public void createUser(@RequestBody @Valid UserSignUpDTO userSignUpDTO) {
        appUserService.save(userSignUpDTO);
    }

}
