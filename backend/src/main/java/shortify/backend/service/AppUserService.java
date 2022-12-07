package shortify.backend.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
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


    public AppUser findUserByUsername(String username) {
        return appUserRepository.findUserByUsername(username);
    }

    public void save(UserSignUpDTO userSignUpDTO) {

        AppUser savedUser = null;

        try {
            savedUser = findUserByUsername(userSignUpDTO.username());
        } catch (Exception exception) {
            logger.warn("Found more than one user");
        }

        if (savedUser == null) {
            String securePassword = SecurityConfig
                    .passwordEncoder
                    .encode(userSignUpDTO.password());

            AppUser appUser = new AppUser(
                    uuidGenerator.generateUUID(),
                    userSignUpDTO.username(),
                    userSignUpDTO.email(),
                    securePassword
            );
            appUserRepository.save(appUser);
            System.out.println(appUser);
        }
    }
}
