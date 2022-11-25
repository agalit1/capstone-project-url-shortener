package shortify.backend;

import org.springframework.web.bind.annotation.*;

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
    public Link insertLink(@RequestBody @Valid NewLink newLink) {
        return linkService.insertLink(newLink);
    }
}
