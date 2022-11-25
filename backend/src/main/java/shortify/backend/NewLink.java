package shortify.backend;

import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;

public record NewLink(
        @NotBlank
        @URL
        String link
) {
}
