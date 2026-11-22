export type ChatbotIntentKind =
  | 'catalog'
  | 'product_price'
  | 'package_availability'
  | 'reservation_instructions'
  | 'partner_information'
  | 'location'
  | 'unknown';

export interface ChatbotQuery {
  intent: ChatbotIntentKind;
  originalText: string;
  normalizedText: string;
}
