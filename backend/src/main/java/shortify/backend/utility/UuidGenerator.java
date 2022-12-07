package shortify.backend.utility;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class UuidGenerator {
    public String generateUUID() {
        return UUID.randomUUID().toString();
    }
}
