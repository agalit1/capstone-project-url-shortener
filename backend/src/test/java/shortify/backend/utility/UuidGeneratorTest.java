package shortify.backend.utility;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class UuidGeneratorTest {

    @Test
    void testGenerateUuidAndExpectIdNotNull() {
        assertNotNull(new UuidGenerator().generateUUID());
    }
}
