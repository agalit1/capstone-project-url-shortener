package shortify.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import shortify.backend.model.AppUser;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.repository.AppUserRepository;
import shortify.backend.utility.SecurityConfig;
import shortify.backend.utility.UuidGenerator;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;
    private final UuidGenerator uuidGenerator;

    Logger logger = LoggerFactory.getLogger(AppUserService.class.getName());

    public AppUser findAppUserByUsername(String username) {
        return appUserRepository.findAppUserByUsername(username);
    }

    public AppUser findAppUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    public AppUser saveUser(UserSignUpDTO userSignUpDTO) {

        if (appUserRepository.existsByEmail(userSignUpDTO.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already in use");
        }

        String securePassword = SecurityConfig
                .passwordEncoder
                .encode(userSignUpDTO.password());

        AppUser appUser = new AppUser(
                uuidGenerator.generateUUID(),
                userSignUpDTO.username(),
                userSignUpDTO.email(),
                securePassword
        );

        return appUserRepository.save(appUser);

    }

//        AppUser savedUser;
//
//        try {
//            savedUser = appUserRepository.findAppUserByEmail(userSignUpDTO.email());
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
//        }
//
//        if (savedUser == null) {
//            String securePassword = SecurityConfig
//                    .passwordEncoder
//                    .encode(userSignUpDTO.password());
//
//            AppUser appUser = new AppUser(
//                    uuidGenerator.generateUUID(),
//                    userSignUpDTO.username(),
//                    userSignUpDTO.email(),
//                    securePassword
//            );
//            savedUser = appUserRepository.save(appUser);
//        }
//        return savedUser;
//    }
}
