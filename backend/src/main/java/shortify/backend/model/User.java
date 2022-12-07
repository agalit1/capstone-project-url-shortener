package shortify.backend.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record User(
        String id,
        @NotBlank
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        String password
) {
}
