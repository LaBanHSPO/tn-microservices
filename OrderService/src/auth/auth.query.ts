
export const makeAuthMutate = () =>  `
    mutation loginUser($username: String, $password: String, $buucuc: String) {
        login(username: $username,password: $password,buucuc: $buucuc) {
          EMAIL
          FIRST_NAME
          LAST_NAME
          TELEPHONE
          ID_NUM
          ID_EMPLOYEE
          ROLES
          TOKEN
        }
      }
      `;


