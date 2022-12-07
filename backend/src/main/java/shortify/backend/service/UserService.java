package shortify.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import shortify.backend.model.User;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.repository.UserRepository;
import shortify.backend.utility.SecurityConfig;
import shortify.backend.utility.UuidGenerator;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UuidGenerator uuidGenerator;

    public void save(UserSignUpDTO userSignUpDTO) {

        String securePassword = SecurityConfig
                .passwordEncoder
                .encode(userSignUpDTO.password());

        User user = new User(
                uuidGenerator.generateUUID(),
                userSignUpDTO.username(),
                userSignUpDTO.email(),
                securePassword
        );
        userRepository.save(user);
    }
}
