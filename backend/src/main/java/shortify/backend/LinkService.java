package shortify.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.stereotype.Service;
import shortify.backend.model.Link;
import shortify.backend.model.LinkRequestDTO;
import shortify.backend.model.LinkResponseDTO;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class LinkService {

    private final String siteUrl;

    private final int linkLength;

    public final LinkRepository linkRepository;

    private final IdGenerator ig;

    public LinkService(
            LinkRepository linkRepository,
            IdGenerator ig,
            @Value("${shortify.siteUrl}") String siteUrl,
            @Value("${shortify.shortening.length}") int linkLength
    ) {
        this.linkRepository = linkRepository;
        this.ig = ig;
        this.siteUrl = siteUrl;
        this.linkLength = linkLength;
    }

    public List<Link> getLinks() {
        return linkRepository.findAll();
    }

    public LinkResponseDTO shortenLink(LinkRequestDTO linkRequestDTO) {

        Link savedLink = null;

        try {
            savedLink = linkRepository.findLinkByLinkIs(linkRequestDTO.link());
        } catch (IncorrectResultSizeDataAccessException exception) {
            System.out.println("Found more than one link");
        }

        if (savedLink == null) {
            String id;
            do {
                id = ig.generateId(this.linkLength);
            } while (linkRepository.existsById(id));
            savedLink = linkRepository.save(new Link(linkRequestDTO.link(), id));
        }

        return new LinkResponseDTO(savedLink.link(), siteUrl + "/" + savedLink.id());
    }

    public String getLongLinkById(String id) {
        Optional<Link> link = linkRepository.findById(id);
        if (link.isPresent()) {
            return link.get().link();
        }
        throw new NoSuchElementException("Request not found");
    }
}
