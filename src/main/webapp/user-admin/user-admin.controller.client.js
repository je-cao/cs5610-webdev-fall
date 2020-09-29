(function () {

    let users = [
        {
            username: 'alice',
            fName: 'Alice',
            lName: 'Wonderland',
            role: 'Faculty'
        },
        {
            username: 'bob',
            fName: 'Robert',
            lName: 'Marley'
        },
        {
            username: 'charlie',
            fName: 'Charlie',
            lName: 'Garcia'
        }
    ]

    let tbody
    let template
    let clone
    let $createBtn
    let $usernameFld, $firstNameFld
    const userService = new AdminUserServiceClient()

    const deleteUser1 = (event) => {
        const deleteBtn = $(event.currentTarget)
        // deleteBtn.parent().parent().parent().remove()
        deleteBtn.parents("tr.wbdv-template").remove()
        // console.log(deleteBtn)
    }

    let selectedUserIndex = -1
    const selectUser = (index) => {
        selectedUserIndex = index
        $("#usernameFld").val(users[index].username)
        $("#firstNameFld").val(users[index].first)
    }

    const renderUsers = (users) => {
        tbody.empty()
        const ul = $("<ul>")
        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            // console.log(user.username)
            const li = $("<li>" + user.username + "</li>")
            ul.append(li)

            clone = template.clone()
            clone.removeClass("wbdv-hidden")

            clone.find(".wbdv-username").html(user.username)
            clone.find(".wbdv-first-name").html(user.first)
            clone.find(".wbdv-last-name").html(user.last)
            clone.find(".wbdv-remove").click(() => deleteUser2(i))
            clone.find(".wbdv-edit").click(() => selectUser(i))

            tbody.append(clone)
        }
        container.append(ul)
    }

    const deleteUser2 = (_index) => {
        const user = users[_index]
        const userId = user._id
        userService.deleteUser(userId)
            .then(response => {
                users.splice(_index, 1)
                renderUsers(users)
            })
    }

    const createUser = () => {
        console.log("create user")
        const username = $usernameFld.val()
        const firstName = $firstNameFld.val()

        $usernameFld.val("")
        $firstNameFld.val("")

        const newUser = {
            username: username,
            first: firstName,
            last: 'TBD1',
            role: 'TBD2'
        }
        userService.createUser(newUser)
            .then(actualNewUser => {
                users.push(actualNewUser)
                renderUsers(users)
            })
    }

    const updateSelecteUser = () => {
        const newUsername = $("#usernameFld").val()
        const newFirstName = $("#firstNameFld").val()
        const userId = users[selectedUserIndex]._id
        userService.updateUser(userId, {
            username: newUsername,
            first: newFirstName
        })
            .then(response => {
                users[selectedUserIndex].username = newUsername
                users[selectedUserIndex].first = newFirstName
                renderUsers(users)
            })
    }

    const init = () => {


        const heading1 = jQuery("h1")
        heading1
            .css("color", "yellow")
            .css("backgroundColor", "red")
            .html("User Administrator")
            .append(" - Only for Administrators")
            .append("<button>Ok</button>")

        const container = $(".container")
        tbody = $("tbody")
        template = $("tr.wbdv-template")
        $createBtn = $(".wbdv-create").click(createUser)
        $firstNameFld = $("#firstNameFld")
        $usernameFld = $("#usernameFld")
        $(".wbdv-update").click(updateSelecteUser)

        // console.log(users)
        userService.findAllUsers()
            .then((_users) => {
                console.log(_users)
                users = _users
                renderUsers(users)
            })

    }
    $(init)


})()