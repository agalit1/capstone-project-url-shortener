package shortify.backend.link;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.annotation.DirtiesContext;
import shortify.backend.IdGenerator;
import shortify.backend.LinkRepository;
import shortify.backend.LinkService;
import shortify.backend.model.LinkRequestDTO;
import shortify.backend.model.LinkResponseDTO;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DataMongoTest
class LinkServiceTest {

    private final String SITE_URL = "localhost:8080";
    private final int LINK_LENGTH = 4;

    @Autowired
    LinkRepository linkRepository;

    @DirtiesContext
    @Test
    void shortenLongLinkAndExpectShortLink() {

        final IdGenerator idGenerator = mock(IdGenerator.class);
        final LinkService linkService = new LinkService(linkRepository, idGenerator, SITE_URL, LINK_LENGTH);

        // Given

        String SHORT_LINK = "a".repeat(LINK_LENGTH);
        String LONG_LINK = "https://testlink.test";

        // When

        when(idGenerator.generateId(LINK_LENGTH)).thenReturn(SHORT_LINK);
        LinkRequestDTO linkRequestDTO = new LinkRequestDTO(LONG_LINK);

        LinkResponseDTO actual = linkService.shortenLink(linkRequestDTO);
        LinkResponseDTO expected = new LinkResponseDTO(LONG_LINK, SITE_URL + "/" + SHORT_LINK);

        // Then

        assertEquals(expected, actual);

    }

    @DirtiesContext
    @Test
    void checkIfLongLinkExistsByIdAndExpectExistingShortLink() {

        final IdGenerator idGenerator = mock(IdGenerator.class);
        final LinkService linkService = new LinkService(linkRepository, idGenerator, SITE_URL, LINK_LENGTH);

        // Given

        String SHORT_LINK = "a".repeat(LINK_LENGTH);
        String SHORT_LINK2 = "b".repeat(LINK_LENGTH);
        String LONG_LINK = "https://testlink.test";

        // When

        when(idGenerator.generateId(LINK_LENGTH)).thenReturn(SHORT_LINK, SHORT_LINK2);
        LinkRequestDTO linkRequestDTO = new LinkRequestDTO(LONG_LINK);

        LinkResponseDTO actual = linkService.shortenLink(linkRequestDTO);
        LinkResponseDTO expected = new LinkResponseDTO(LONG_LINK, SITE_URL + "/" + SHORT_LINK);

        // Then

        assertEquals(expected, actual);

        LinkResponseDTO actual2 = linkService.shortenLink(linkRequestDTO);
        assertEquals(expected, actual2);

    }
}
