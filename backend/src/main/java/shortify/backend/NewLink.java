package shortify.backend;

import javax.validation.constraints.NotBlank;

public record NewLink(
        @NotBlank
        String link
) {
}
