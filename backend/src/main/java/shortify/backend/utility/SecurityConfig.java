package shortify.backend.utility;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import shortify.backend.model.AppUser;
import shortify.backend.service.AppUserService;

import java.util.List;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    public final AppUserService appUserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                .httpBasic().and()
                .authorizeRequests()
                .antMatchers("/api/users/login")
                .authenticated()
                .antMatchers("/api/users/signup", "/api/links"
                )
                .permitAll()
                .antMatchers("/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .antMatchers(HttpMethod.GET, "/", "/static/**", "/index.html", "/register").permitAll()
                .and()
                .build();
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
                        .username(appUser.email())
                        .password(appUser.password())
                        .authorities(List.of())
                        .build();

            }

            @Override
            public void createUser(UserDetails user) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void updateUser(UserDetails user) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void deleteUser(String username) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void changePassword(String oldPassword, String newPassword) {
                throw new UnsupportedOperationException();
            }

            @Override
            public boolean userExists(String username) {
                return false;
            }
        };
    }

}
