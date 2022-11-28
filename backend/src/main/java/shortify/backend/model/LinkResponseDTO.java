package shortify.backend.model;

import org.hibernate.validator.constraints.URL;
import javax.validation.constraints.NotBlank;

public record LinkResponseDTO(
        @NotBlank
        @URL
        String longLink,
        @NotBlank
        @URL
        String shortLink
) {
}
