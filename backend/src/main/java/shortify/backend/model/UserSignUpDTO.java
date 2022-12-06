package shortify.backend.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public record UserSignUpDTO(
        @NotBlank
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Pattern(regexp = "^(?=[^A-Z]*+[A-Z])(?=[^a-z]*+[a-z])(?=\\D*+\\d)(?=[^#?!@$ %^&*-]*+[#?!@$ %^&*-]).{8,}$", message = "Password must have minimum eight characters, at least one letter and one number!")
        String password,
        @NotBlank
        String confirmPassword
) {
}
