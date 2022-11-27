package shortify.backend.model;

public record LinkResponseDTO(
        String longLink,
        String shortLink
) {
}
