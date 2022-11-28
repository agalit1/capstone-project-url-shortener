package shortify.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import shortify.backend.model.Link;
import shortify.backend.model.LinkRequestDTO;
import shortify.backend.model.LinkResponseDTO;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class LinkService {

    @Value("${shortify.siteUrl}")
    private String siteUrl;

    @Value("${shortify.shortening.length}")
    private int linkLength;
    public final LinkRepository linkRepository;

    public LinkService(LinkRepository linkRepository) {
        this.linkRepository = linkRepository;
    }

    public List<Link> getLinks() {
        return linkRepository.findAll();
    }

    public LinkResponseDTO shortenLink(LinkRequestDTO linkRequestDTO) {

        // TODO: if longLink exists, id =  existing shortLink
        String id;

        // else generate new ID
        IdGenerator ig = new IdGenerator();
        do {
            id = ig.generateId(this.linkLength);
        } while (linkRepository.existsById(id));

        Link link = new Link(linkRequestDTO.link(), id);
        linkRepository.save(link);

        LinkResponseDTO linkResponseDTO = new LinkResponseDTO(link.link(), siteUrl + "/" + id);
        return linkResponseDTO;
    }

    public String getLongLinkById(String id) {
        Optional<Link> link = linkRepository.findById(id);
        if (link.isPresent()) {
            return link.get().link();
        }
        throw new NoSuchElementException("Request not found");
    }
}
