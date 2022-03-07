export const findNodeById = (tree, id, childPath, idPath)=> {
  if(!tree.length)return;
  for(let i = 0;i< tree.length;i++){
    let child = tree[i];
    if(child[idPath] == id){
      return child;
    }
    let childs = child[childPath];
    if(childs && childs.length){
      return findNodeById(childs, id, childPath, idPath);
    }
  }
};


export const walkTree = (tree, childPath, level, parent, fn) => {
  if (Array.isArray(tree) && tree.length) {
    walkArray(tree, childPath, level, parent, fn);
  } else if (typeof tree === "object") {
    fn(tree, level, parent);
    let children = tree[childPath];
    if (Array.isArray(children) && children.length) {
      walkArray(children, childPath, ++level, tree, fn);
    }
  }
};

export const walkArray = (array, childPath, level, parent, fn) => {
  for (let i = 0; i < array.length; i++) {
    let trunk = array[i];
    walkTree(trunk, childPath, level, parent, fn);
  }
};

export const imgUrlEncode = (path)=> {
  if(!path)return "";
  let r_path = path.replace(/\s/g, encodeURIComponent(" "));
  console.log(r_path);
  return r_path;
};


export const getConfig = async ()=> {
  return new Promise((resolve, reject)=> {
    let timer = setInterval(() => {
      let config = localStorage.getItem("config");
      if(!config){
        return;
      }else{
        clearInterval(timer);
        resolve(JSON.parse(config));
      }
    }, 500);
  });
};