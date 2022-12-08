package shortify.backend.utility;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import shortify.backend.model.AppUser;
import shortify.backend.service.AppUserService;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public final AppUserService appUserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,
                        "/api/users/signup", "/api/links"
                ).permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/users/login")
                .authenticated()
                .anyRequest().denyAll()
                .and().build();
    }

    @Bean
    public PasswordEncoder encoder() {
        return passwordEncoder;
    }

    @Bean
    public UserDetailsManager userDetailsManager() {

        return new UserDetailsManager() {

            @Override
            public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
                AppUser appUser = appUserService.findAppUserByEmail(usernameOrEmail);
                if (appUser == null) {
                    throw new UsernameNotFoundException("Invalid email or password");
                }
                return User.builder()
                        .username(appUser.username())
                        .password(appUser.password())
                        .build();
            }

            @Override
            public void createUser(UserDetails user) {

            }

            @Override
            public void updateUser(UserDetails user) {

            }

            @Override
            public void deleteUser(String username) {

            }

            @Override
            public void changePassword(String oldPassword, String newPassword) {

            }

            @Override
            public boolean userExists(String username) {
                return false;
            }
        };
    }
}
