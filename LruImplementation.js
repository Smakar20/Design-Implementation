/*LRU implementation*/

class Node{
  constructor(key, val){
    this.obj = {}
    this.obj.key = key
    this.obj.val = val
    this.next = null
    this.prev = null
  }
}

class LruImple{
  constructor(maxListSize){
    this.maxListSize = maxListSize
    this.listSize = 0
    this.hashMap = {}
    this.head = null
    this.tail = null
  }
  
  get(key){
    if(key == '' || key == null || this.hashMap[key] == undefined) return 
    var nodeToGet = this.hashMap[key]
    if(nodeToGet != this.head){
      if(nodeToGet == this.tail){
        this.tail = this.tail.prev
        this.tail.next = null
      }else{
        var temp = nodeToGet.prev
        nodeToGet.prev.next = nodeToGet.next
        nodeToGet.next.prev = temp
      }
      nodeToGet.prev = null
      nodeToGet.next = this.head
      this.head.prev = nodeToGet
      this.head = nodeToGet
    }
    return nodeToGet.obj.val
  }
  
  put(key,val){
    if(key == '' || key == null || val == '' || val == null) return
    if(this.listSize == this.maxListSize){
      var keyToDel = this.tail.obj.key
      this.tail = this.tail.prev
      this.tail.next = null
      delete this.hashMap[keyToDel]
      this.listSize -= 1
    }
    
    var newNode = new Node(key,val)
    newNode.prev = null
    newNode.next = null
    if(this.head == null){
      this.head = newNode
      this.tail = this.head
    }else{
      this.head.prev = newNode
      newNode.next = this.head
      this.head = this.head.prev
      this.head.prev = null
    }
    this.listSize += 1
    this.hashMap[key] = newNode
  }
  
  delete(key){
    if(this.hashMap[key] == undefined) return
    var nodeToDel = this.hashMap[key]
    delete this.hashMap[key]
    if(nodeToDel == this.head){
      this.head = this.head.next
      this.head.prev = null
    }else if(nodeToDel == this.tail){
      this.tail = this.tail.prev
      this.tail.next = null
    }else{
      var temp = nodeToDel.prev
      nodeToDel.prev.next = nodeToDel.next
      nodeToDel.next.prev = temp
    }
  }
}

//--------test---------
var lruImple = new LruImple(3)
var toInsert1 = {'Name': 'Sohi', 'Occupation': 'SW Engg'}
var toInsert2 = {'Name': 'Saty', 'Occupation': 'Prod Manager'}
var toInsert3 = {'Name': 'Sona', 'Occupation': 'UX Designer'}
var toInsert4 = {'Name': 'Rumpa', 'Occupation': 'Staff Consultant'}
//insert 
lruImple.put(10,toInsert1)
lruImple.put(11,toInsert2)
lruImple.put(12,toInsert3)

console.log('--------map------')
console.log(lruImple.hashMap)
console.log('-------head-------')
console.log(lruImple.head)
console.log('---------head after get-----------')
lruImple.get(10)
console.log(lruImple.head)
console.log('-----inserting new key,value ------')
lruImple.put(13,toInsert4)
console.log('------new map---------')
console.log(lruImple.hashMap)
console.log('-------new head------')
console.log(lruImple.head)
