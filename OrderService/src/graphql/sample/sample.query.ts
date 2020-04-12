
export const CrbLogChuteListQuery = `
  query getList($getActiveChute: Bool, $token: String) {
    Sample(id: $id,token: $token) {
        ID_CHUTE,
        BILLS,
        SENSOR_COUNTS,
        SOME_BILLS,
        TIME_START,
        TIME_END,
        STATUS
        }
     }   
    `;
