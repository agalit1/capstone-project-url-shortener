package shortify.backend;

import javax.validation.constraints.NotBlank;

public record Link(
        @NotBlank
        String link,
        String id
) {
}
