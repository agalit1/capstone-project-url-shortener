package shortify.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import shortify.backend.model.AppUser;

@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String> {
   AppUser findAppUserByEmail(String email);

   boolean existsByEmail(String email);
}
