package shortify.backend.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password
) {
}
