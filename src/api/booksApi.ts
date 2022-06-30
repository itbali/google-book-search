import {instance} from "./instance";

export type SubjectTypes = "all"|"biography"|"computers"| "history"| "medical"| "poetry"
export type OrderByTypes = "relevance"|"newest"
export type GetBooksQueryParams = {
  title: string
  maxResults: number
  subject: SubjectTypes
  orderBy: OrderByTypes
};
export type BookType =  {
    "kind": string,
    "id": string,
    "etag": string,
    "selfLink": string,
    "volumeInfo": {
      "title": string,
      "authors": string[],
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
  "books": Array<BookType>
};

export const cardsAPI = {
  getCards(params: GetBooksQueryParams) {
    return instance.get<GetBooksResponseDataType>("", {params})
      .then(response => response.data);
  }
}