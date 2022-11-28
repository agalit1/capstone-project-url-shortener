package shortify.backend;

import org.springframework.web.bind.annotation.*;
import shortify.backend.model.Link;
import shortify.backend.model.LinkRequestDTO;
import shortify.backend.model.LinkResponseDTO;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/links")
public class LinkController {
    private final LinkService linkService;
    public LinkController(LinkService linkService) {
        this.linkService = linkService;
    }
    @GetMapping
    public List<Link> getLinks() {
        return linkService.getLinks();
    }

    @PostMapping
    public LinkResponseDTO shortenLink(@RequestBody @Valid LinkRequestDTO linkRequestDTO) {
        return linkService.shortenLink(linkRequestDTO);
    }
}
