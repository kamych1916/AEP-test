<template>
    <div class="wrap__sidebar">
        <SidebarContext />
    </div>
</template>

<style>
.wrap__sidebar{
    height: 95vh;
    background-color: #1E222A;
    width: 15%;
}

@media (max-width: 1035px) {
    .wrap__sidebar{
        display: none;
    }
}
</style>
