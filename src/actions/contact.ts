import { contactSchema, type ContactInput } from "../lib/validation/contact";

interface PocketBaseCollectionClient {
  create(payload: Record<string, unknown>): Promise<Record<string, unknown>>;
}

interface PocketBaseLikeClient {
  collection(name: string): PocketBaseCollectionClient;
}

export async function submitContactMessage(
  client: PocketBaseLikeClient,
  input: ContactInput,
) {
  const payload = contactSchema.parse(input);

  return client.collection("messages").create({
    ...payload,
    is_processed: false,
  });
}
