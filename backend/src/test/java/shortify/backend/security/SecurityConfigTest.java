package shortify.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import shortify.backend.model.AppUser;
import shortify.backend.model.UserSignUpDTO;
import shortify.backend.service.AppUserService;
import shortify.backend.utility.SecurityConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {


    private final AppUserService appUserService = mock(AppUserService.class);

    @Test
    void createUserDetails() {

        // Given

        String id = "123";
        String encodedPassword = "$2a$12$EdmNbHOU0tuhm0jIDUnkp.SJnpsIA0uCR5yo/zgbJ9HqwCvbWrdCK";
        UserSignUpDTO userSignUpDTO = new UserSignUpDTO("test", "test@test.com", "abC1234!", "abC1234!");
        AppUser appUser = new AppUser(id, userSignUpDTO.username(), userSignUpDTO.email(), encodedPassword);

        // When

        SecurityConfig securityConfig = new SecurityConfig(appUserService);
        when(appUserService.findAppUserByEmail(appUser.email())).thenReturn(appUser);

        String actual = securityConfig.userDetailsManager()
                .loadUserByUsername(appUser.email())
                .getPassword();

        // Then

        assertEquals(encodedPassword, actual);

    }

}
