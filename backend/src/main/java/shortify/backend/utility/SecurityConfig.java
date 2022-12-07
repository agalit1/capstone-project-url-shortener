package shortify.backend.utility;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import shortify.backend.service.UserService;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public final UserService userService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST,
                        "/api/users/signup"
                ).permitAll()
                .antMatchers("/api/users/login",
                        "/api/users-logout"
                ).authenticated()
                .anyRequest().denyAll()
                .and().build();
    }

    public UserDetailsManager userDetailsManager() {

        return new UserDetailsManager() {

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

            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return null;
            }
        };

    }

    @Bean
    public PasswordEncoder encoder() {
        return passwordEncoder;
    }
}
