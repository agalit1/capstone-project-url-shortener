package shortify.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import shortify.backend.model.AppUser;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.repository.AppUserRepository;
import shortify.backend.service.AppUserService;
import shortify.backend.utility.UuidGenerator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AppUserServiceTest {

    private final AppUserRepository appUserRepository = mock(AppUserRepository.class);

    private final UuidGenerator uuidGenerator = mock(UuidGenerator.class);
    private final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    private final AppUserService appUserService = new AppUserService(appUserRepository, uuidGenerator, passwordEncoder);

    @Test
    void createAppUserAndExpectCreatedUser() {

        // Given
        String id = "123";
        String encodedPassword = "$2a$12$EdmNbHOU0tuhm0jIDUnkp.SJnpsIA0uCR5yo/zgbJ9HqwCvbWrdCK";
        UserSignUpDTO userSignUpDTO = new UserSignUpDTO("test", "test@test.com", "abC1234!", "abC1234!");
        AppUser appUser = new AppUser(id, userSignUpDTO.username(), userSignUpDTO.email(), encodedPassword);


        // When
        when(passwordEncoder.encode(userSignUpDTO.password())).thenReturn(encodedPassword);
        when(appUserRepository.save(appUser)).thenReturn(appUser);
        when(uuidGenerator.generateUUID()).thenReturn(id);
        AppUser actual = appUserService.saveUser(userSignUpDTO);

        // Then
        assertEquals(appUser, actual);
    }

    @Test
    void searchAppUserByEmailAndExpectFoundAppUser() {

        // Given

        UserSignUpDTO userSignUpDTO = new UserSignUpDTO("test", "test@test.com", passwordEncoder.encode("abC1234!"), "abC1234!");
        AppUser appUser = new AppUser(uuidGenerator.generateUUID(), userSignUpDTO.username(), userSignUpDTO.email(), userSignUpDTO.password());

        // When

        when(appUserRepository.findAppUserByEmail(appUser.email())).thenReturn(appUser);
        AppUser actual = appUserService.findAppUserByEmail(appUser.email());

        // Then

        assertEquals(appUser, actual);
    }

    @Test
    void checkIfUserExistsByEmailAndIfNotFoundExpectBadRequest() {

        // Given

        UserSignUpDTO userSignUpDTO = new UserSignUpDTO("test", "test@test.com", passwordEncoder.encode("abC1234!"), "abC1234!");

        // When

        when(appUserRepository.existsByEmail(userSignUpDTO.email())).thenThrow(ResponseStatusException.class);

        // Then

        assertThrows(ResponseStatusException.class,
                () -> appUserService.saveUser(userSignUpDTO));
    }
}
