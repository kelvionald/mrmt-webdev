`const keyForDb = 'TODO_NOTES'`

Todo = (formSelector) ->
  form = $(formSelector)
  this.inputNote = form.find '.input_note'

  this.$prioritySelected = form.find('.btn > div')
  this.$content = form.find('.note_elements')
  this.mapClass = 
    high    : 'circle_red'
    middle  : 'circle_yellow'
    low     : 'circle_green'

  obj = this

  this.clearInput = () ->
    this.prioritySelected = false
    this.classSelected = false
    this.$prioritySelected.attr 'class', 'circle_grey'
    this.inputNote.val('')

  this.clearInput()

  this.Note = (text, priority) ->
    this.priority = priority
    this.text     = text
    this.status   = 0

  this.NoteList = new () -> # анонимный класс, шедеврально
    noteListObject = this
    this.array = []
    this.add = (text, priority) ->
      noteListObject.array.push(new obj.Note(text, priority))
      obj.saveNotes()
    this.delete = (index) ->
      noteListObject.array.splice(index, 1);
      obj.saveNotes()
    this.init = (array) ->
      c = 0
      for note in array
        obj.addNoteToDisplay(note.text, obj.mapClass[note.priority], c++, note.status)
      noteListObject.array = array
    false

  this.repaint = (param = {}) ->
    obj.$content.html('')
    c = 0
    newArr = obj.NoteList.array

    if param.priority
      priority = param.priority
      newArr.sort (a, b) ->
        mapPriority = 
          high   : 0
          middle : 1
          low    : 2
        if mapPriority[priority] == mapPriority[a.priority]
          return 1
        else if mapPriority[priority] == mapPriority[b.priority]
          return -1
        0
    else if param.status == 0 or param.status == 1
      status = param.status
      newArr.sort (a, b) ->
        if a.status == status
          return 1
        else if b.status == status
          return -1
        0
    else
      newArr = obj.NoteList.array

    for note in newArr
      obj.addNoteToDisplay(note.text, obj.mapClass[note.priority], c, note.status)
      c++

  this.addNoteToNoteList = (text, priority) ->
    obj.NoteList.add(text, priority)

  this.addNoteToDisplay = (text, className, index, status) ->
    tmpl = _.template($('#note_template').text())
    if status
      addStyle = 'green' 
    else 
      addStyle = ''
    data = 
      content : text
      className : className
      index : index
      addStyle : addStyle
    obj.$content.prepend tmpl(data)

  $alertWarning = $('.alert_select_priority')

  todoAlert = (msg) ->
    $alertWarning.css('display', 'block').find('.msg').html msg

  todoAlertHide = () ->
    $alertWarning.css('display', 'none')

  form.on 'submit', (e) ->
    e.preventDefault()
    value = obj.inputNote.val()
    if value.length > 0
      if obj.prioritySelected and obj.classSelected

        obj.addNoteToDisplay(value, obj.classSelected, obj.NoteList.array.length, 0)
        obj.addNoteToNoteList(value, obj.prioritySelected)
        obj.clearInput()
        obj.inputNote.focus()

        todoAlertHide()
      else
        todoAlert 'Выберите приоритет.'
    else
      todoAlert 'Введите содержание заметки.'

  form.find('.list_priority').on 'click', (e) ->
    $target = $(e.target)
    priority = $target.attr 'priority'
    className = $target.attr 'class'
    if className != undefined and priority != undefined
      obj.$prioritySelected.attr 'class', className
      obj.prioritySelected = priority
      obj.classSelected = className
  

  this.deleteFromNoteList = (index) ->
    obj.NoteList.delete(index)
    obj.repaint()

  form.find('.note_elements').on 'click', (e) ->
    $target = $(e.target)
    index = $target.parent().attr('index')
    if $target.attr('class').indexOf('delete_note') != -1
      obj.deleteFromNoteList(index)
    else if $target.attr('class').indexOf('is_complete') != -1
      if obj.NoteList.array[index].status == 1
        newStatus = 0
      else
        newStatus = 1
      obj.NoteList.array[index].status = newStatus
      obj.saveNotes()
      obj.repaint()

  this.saveNotes = () ->
    str = JSON.stringify obj.NoteList.array
    localStorage.setItem(keyForDb, str);

  this.loadNotes = () ->
    str = localStorage.getItem(keyForDb);
    if str
      obj.NoteList.init JSON.parse(str)

  this.loadNotes()

  form.find('.sort_bar').on 'click', (e) ->
    $target = $(e.target)
    priority = $target.attr('priority')

    if priority
      obj.repaint({priority: priority})
    else
      status = if $target.attr('class').indexOf('green') != -1 then 1 else 0
      obj.repaint({status: status})
  false

todo = new Todo('.todo_container')