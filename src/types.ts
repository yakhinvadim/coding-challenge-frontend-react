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

export interface Query {
  page?: number;
  per_page?: number;
  occurred_before?: number;
  occurred_after?: number;
  incident_type?:
    | "crash"
    | "hazard"
    | "theft"
    | "unconfirmed"
    | "infrastructure_issue"
    | "chop_shop";
  proximity?: string;
  proximity_square?: number;
  query?: string;
}
