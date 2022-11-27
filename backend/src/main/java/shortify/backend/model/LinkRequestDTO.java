package shortify.backend.model;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;

public record LinkRequestDTO(
        @NotBlank
        @URL
        String link
) {
}
