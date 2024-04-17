class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        try {
            const keyword = this.queryStr.keyword ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }
            } : {};
            this.query = this.query.find({ ...keyword });
        } catch (error) {
            console.error("Error in search method:", error);
        }
        return this;
    }

    filter() {
        try {
            const queryCopy = { ...this.queryStr };
            const removeFields = ["keyword", "page", "limit"];
            removeFields.forEach(key => delete queryCopy[key]);
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);
            this.query = this.query.find(JSON.parse(queryStr));
        } catch (error) {
            console.error("Error in filter method:", error);
        }
        return this;
    }

    pagination(resultPerPage) {
        try {
            const currentPage = Number(this.queryStr.page) || 1;
            const skip = resultPerPage * (currentPage - 1);
            this.query = this.query.limit(resultPerPage).skip(skip);
        } catch (error) {
            console.error("Error in pagination method:", error);
        }
        return this;
    }
}

module.exports = ApiFeatures;















// class ApiFeatures{
//     constructor(query,queryStr){
//         this.query=query;
//        this.queryStr=queryStr; 
//     }

//     search(){
//         const keyword = this.queryStr.keyword 
//         ? {
//             name:{
//                 $regex: this.queryStr.keyword,   //regex=regular expression
//                 $options: "i",  //for case insensitive
//             }
//         }
//         :{};

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }
// //filter function
//     filter(){
//         const queryCopy = { ...this.queryStr };
//         //   Removing some fields for category
//         const removeFields = ["keyword", "page", "limit"];
        
//         removeFields.forEach(key => delete queryCopy[key]);
         
//    // Filter For Price and Rating
 
//   let queryStr = JSON.stringify(queryCopy)
//    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

//         this.query = this.query.find(JSON.parse(queryStr));

//          return this;
//     }

//     //pagination
//     pagination(resultPerPage){
//         const currentPage = Number(this.queryStr.page )|| 1;

//         const skip = resultPerPage * (currentPage - 1);
//         this.query = this.query.limit(resultPerPage).skip(skip);

//         return this;
//     }
// }
// module.exports=ApiFeatures;