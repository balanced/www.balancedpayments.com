
Balanced.Payouts = {
    setPrimary: function (data) {
        var $ul = data.field.closest('ul');
        var $li = data.field.closest('li');
        $('button.primary', $ul).removeClass('disabled');
        $('button.primary', $li).addClass('disabled');
    },
    deletePayout: function(data) {
        var $li = data.field.closest('li');
        $li.fadeOut();
    }
};
