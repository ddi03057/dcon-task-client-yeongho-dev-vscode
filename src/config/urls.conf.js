
export default {
    profile: "",
    session_timestamp_key: "",
    clientId: "dcon-task",
    realm: "dcon",
    url: '',
    init: function(profile) {
        this.profile = profile;
        switch(profile){
            case 'PROD':
                this.session_timestamp_key = "session_timestamp";
                break;
            case 'DEV':
                this.session_timestamp_key = "session_timestamp_dev";
                break;
            case 'STAGE':
                this.session_timestamp_key = "session_timestamp_stage";
                break;
            case "LOCAL":
                this.session_timestamp_key = "session_timestamp_local";
                this.url = 'http://localhost:8081/auth'
                break;
        }
    },
}
