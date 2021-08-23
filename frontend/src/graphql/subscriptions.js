export const onOrderUpdated = /* GraphQL */ `
    subscription onOrderUpdated($id: ID!) {
        onOrderUpdated(ORDER_ID: $id) {
            ORDER_ID
            CREATEDAT
            DESCRIPTION
            ORDER_ID
            TITLE
            UPDATEDAT
        }
    }
`;