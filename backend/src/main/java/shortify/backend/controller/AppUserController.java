package shortify.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/login")
    public HttpStatus login() {
        return HttpStatus.OK;
    }
}


//                BindingResult result
//        AppUser existingUser = appUserService.findAppUserByEmail(userSignUpDTO.email());
//        if(existingUser != null && existingUser.email() != null && existingUser.email().isEmpty()) {
//            result.rejectValue("email", null, "Email is already in use");
//        }
//        if(result.hasErrors()) {
//            return "/signup";
//        }
//        appUserService.saveUser(userSignUpDTO);
//        return "redirect:/signup?success";
