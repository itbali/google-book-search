import {instance} from "./instance";
export const key = "AIzaSyB1G9yn8AfZrs6_yQ-Xdng4d007jB2rfMM"

//query types
export type SubjectTypes = "all" | "art" | "biography" | "computers" | "history" | "medical" | "poetry"
export type OrderByTypes = "relevance" | "newest"
export type GetBooksQueryParams = {
  q?: string
  maxResults?: number
  subject?: SubjectTypes
  orderBy?: OrderByTypes
  startIndex?: number
};

//dataTypes
export type BookType = {
  "kind": string,
  "id": string,
  "etag": string,
  "selfLink": string,
  "volumeInfo": {
    subtitle?: string;
    "title": string,
    "authors"?: string[],
    "publisher": string,
    "publishedDate": string,
    "description": string,
    "industryIdentifiers": Array<{
      "type": string,
      "identifier": string
    }>
    "readingModes": {
      "text": boolean,
      "image": boolean
    },
    "printType": string,
    "categories": Array<string>,
    "maturityRating": string,
    "allowAnonLogging": boolean,
    "contentVersion": string,
    "panelizationSummary": {
      "containsEpubBubbles": boolean,
      "containsImageBubbles": boolean
    },
    "imageLinks": {
      "smallThumbnail": string,
      "thumbnail": string
    },
    "language": string,
    "previewLink": string,
    "infoLink": string,
    "canonicalVolumeLink": string
  },
  "saleInfo": {
    "country": string,
    "saleability": string,
    "isEbook": boolean,
    "listPrice": {
      "amount": number,
      "currencyCode": string
    },
    "retailPrice": {
      "amount": number,
      "currencyCode": string
    },
    "buyLink": string,
    "offers": [
      {
        "finskyOfferType": number,
        "listPrice": {
          "amountInMicros": number,
          "currencyCode": string
        },
        "retailPrice": {
          "amountInMicros": number,
          "currencyCode": string
        }
      }
    ]
  },
  "accessInfo": {
    "country": string,
    "viewability": string,
    "embeddable": boolean,
    "publicDomain": boolean,
    "textToSpeechPermission": string,
    "epub": {
      "isAvailable": boolean
    },
    "pdf": {
      "isAvailable": boolean,
      "acsTokenLink": string
    },
    "webReaderLink": string,
    "accessViewStatus": string,
    "quoteSharingAllowed": boolean
  },
  "searchInfo": {
    "textSnippet": string
  }
}
export type GetBooksResponseDataType = {
  "kind": string,
  "totalItems": number,
  "items": Array<BookType>
};

export type SingleBookResponseDataType = {
  "kind": string,
  "id": string,
  "etag": string,
  "selfLink": string,
  "volumeInfo": {
    "title": string,
    "authors"?: string[],
    "publisher"?: string,
    "publishedDate"?: string,
    "description"?: string,
    "industryIdentifiers": Array<{
      "type": string,
      "identifier": string
    }>,
    "readingModes": {
      "text": boolean,
      "image": boolean
    },
    "pageCount": number,
    "printedPageCount": number,
    "printType": string,
    "categories": string[],
    "maturityRating": string,
    "allowAnonLogging": boolean,
    "contentVersion": string,
    "panelizationSummary": {
      "containsEpubBubbles": boolean,
      "containsImageBubbles": boolean
    },
    "imageLinks"?: {
      "smallThumbnail"?: string,
      "thumbnail"?: string,
      "small"?: string,
      "medium"?: string,
      "large"?: string,
      "extraLarge"?: string
    },
    "language": string,
    "previewLink": string,
    "infoLink": string,
    "canonicalVolumeLink": string
  },
  "layerInfo": {
    "layers": Array<{
      "layerId": string,
      "volumeAnnotationsVersion": string
    }>
  },
  "saleInfo": {
    "country": string,
    "saleability": string,
    "isEbook": boolean
  },
  "accessInfo": {
    "country": string,
    "viewability": string,
    "embeddable": boolean,
    "publicDomain": boolean,
    "textToSpeechPermission": string,
    "epub": {
      "isAvailable": boolean,
      "acsTokenLink": string
    },
    "pdf": {
      "isAvailable": boolean,
      "acsTokenLink": string
    },
    "webReaderLink": string,
    "accessViewStatus": string,
    "quoteSharingAllowed": boolean
  }
}

//api for books
export const booksAPI = {
  getBooks(params: GetBooksQueryParams) {
    return instance.get<GetBooksResponseDataType>("", {
      params: {
        ...params,
        key
      }
    })
      .then(response => response.data);
  },
  getBookDescription<SingleBookResponseDataType>(id: string) {
    return instance.get<SingleBookResponseDataType>(`/${id}`, {
      params: {
        key
      }
    })
      .then(response => response.data)
  }
}
