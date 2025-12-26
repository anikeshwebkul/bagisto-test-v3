import { gql } from "@apollo/client";

export const GET_HOME_CATEGORIES = gql`
query Categories {
    categories {
        edges {
            node {
             id
             logoUrl
                translation {
                   name
                    slug
                    id
                    _id
                }
            }
        }
    }
}` ; 