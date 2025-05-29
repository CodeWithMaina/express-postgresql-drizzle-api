import db from "./db";
import {  stateTable,  cityTable,  userTable,  restaurantTable,  restaurantOwnerTable,} from "./schema";
 
async function seed() {
  // Insert states
  const [california] = await db
    .insert(stateTable)
    .values({ stateName: "California", stateCode: "CA" })
    .returning();
  const [texas] = await db
    .insert(stateTable)
    .values({ stateName: "Texas", stateCode: "TX" })
    .returning();
 
  // Insert cities
  const [la] = await db
    .insert(cityTable)
    .values({ cityName: "Los Angeles", stateId: california.stateId })
    .returning();
  const [sf] = await db
    .insert(cityTable)
    .values({ cityName: "San Francisco", stateId: california.stateId })
    .returning();
  const [houston] = await db
    .insert(cityTable)
    .values({ cityName: "Houston", stateId: texas.stateId })
    .returning();
 
  // Insert users
  const [alice] = await db
    .insert(userTable)
    .values({
      fullName: "Alice Smith",
      email: "alice@example.com",
      password: "password1",
    })
    .returning();
  const [bob] = await db
    .insert(userTable)
    .values({
      fullName: "Bob Jones",
      email: "bob@example.com",
      password: "password2",
    })
    .returning();
 
  // Insert restaurants
  const [tastyBites] = await db
    .insert(restaurantTable)
    .values({
      restaurantName: "Tasty Bites",
      streetAddress: "123 Main St",
      zipCode: "90001",
      cityId: la.cityId,
    })
    .returning();
  const [pizzaPlace] = await db
    .insert(restaurantTable)
    .values({
      restaurantName: "Pizza Place",
      streetAddress: "456 Elm St",
      zipCode: "77001",
      cityId: houston.cityId,
    })
    .returning();
 
  // Insert restaurant owners
  await db.insert(restaurantOwnerTable).values({
    restaurantId: tastyBites.restaurantId,
    ownerId: alice.userId,
  });
  await db.insert(restaurantOwnerTable).values({
    restaurantId: pizzaPlace.restaurantId,
    ownerId: bob.userId,
  });
 
  console.log("✅ Seeding complete!");
  process.exit(0);
}
 
seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});