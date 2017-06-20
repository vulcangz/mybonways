import m from "mithril";
export var CategoriesModel = {
  Categories:[],
  NewCategory:{},
  GetCategories:function(){
    return  m
      .request({
        method: 'GET',
        url: '/api/categories',
      })
      .then(function(response) {
        console.log("all cat. response: ", response);
        CategoriesModel.Categories = response;
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  AddCategory:function(){
    // var data  = {Category:CategoriesModel.NewCategory}
    return m
      .request({
        method: 'POST',
        url: '/api/categories',
        data: CategoriesModel.NewCategory,
      })
      .then(function(responseCategory) {
        console.log("new category: ", responseCategory);
        console.log(CategoriesModel.Categories)
        CategoriesModel.Categories.unshift(responseCategory)
        m.redraw()
      })
      .catch(function(error) {
        console.error(error);
      });
  },
  Delete: function(e) {
    console.log("delete: ", CategoriesModel.Categories[e.target.id]);
    return m.request({
      method: "DELETE",
      url: "/api/categories/" + CategoriesModel.Categories[e.target.id].id
    }).then(function(response){
      console.log("deleted: ", response)
      CategoriesModel.GetCategories();

    })
  }
}
