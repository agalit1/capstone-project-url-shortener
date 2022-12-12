package shortify.backend.service;

import lombok.RequiredArgsConstructor;
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

}
