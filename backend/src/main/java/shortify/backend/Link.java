package shortify.backend;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;

public record Link(
        @NotBlank
        @URL
        String link,
        String id
) {
}
