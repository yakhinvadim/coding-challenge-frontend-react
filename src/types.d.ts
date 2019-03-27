export interface Incident {
  id: number;
  title: string;
  description: string;
  address: string;
  occurred_at: number;
  updated_at: number;
  url: string;
  source: {
    name: string;
    html_url: string;
    api_url: string;
  };
  media: {
    image_url: string | null;
    image_url_thumb: string | null;
  };
  location_type: null;
  location_description: null;
  type: string;
  type_properties: null;
}
